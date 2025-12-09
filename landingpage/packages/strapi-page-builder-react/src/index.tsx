"use client";

import { processConfig, processProps } from "./utils";
import { DropZone as PuckDropZone } from "@measured/puck";
import { FieldLabel as PuckFieldLabel, walkTree as puckWalkTree } from "@measured/puck";
import { Render as PuckRender, resolveAllData as puckResolveAllData } from "@measured/puck";
import { useEffect, useMemo, useState, createContext, useCallback, useContext, useRef } from "react";
import { Puck, usePuck } from "@measured/puck";
import "@measured/puck/puck.css";

// Render Component
export const Render = ({
    config,
    data: { content, templateJson },
    strapi,
}: {
    config: any;
    data: { content: any; templateJson: any };
    strapi: any;
}) => {
    const [data, setData] = useState<any>(null);
    const processedConfig = useMemo(() => processConfig(strapi, config), [strapi, config]);

    useEffect(() => {
        puckResolveAllData(templateJson, processedConfig, content).then((resolvedData) => {
            setData(resolvedData);
        });
    }, [processedConfig, content, templateJson]);

    return data ? <PuckRender config={processedConfig} data={data} metadata={content} /> : null;
};

// Context
const EditorContext = createContext({
    templateJson: { content: [], root: {}, zones: {} },
    setEditorData: (_data: any, _undo: boolean, _redo: boolean) => { },
    setControls: (_undo: any, _redo: any, _toggleLeft: any, _toggleRight: any) => { },
});


const sendMessage = (message: any) => {
    if (window.parent && window.parent.postMessage) {
        window.parent.postMessage(message, "*");
    }
};

// Editor Component
export function Editor({
    config,
    strapi,
}: {
    config: any;
    strapi: any;
}) {

    const [permissions, setPermissions] = useState({
        read: false,
        edit: false,
        modify: false,
    });
    const [metadata, setMetadata] = useState({});
    const [templateJson, setTemplateJson] = useState<any>(null);
    const [canEdit, setCanEdit] = useState(true);
    const [locale, setLocale] = useState("");
    const [enforceTemplateShape, setEnforceTemplateShape] = useState(true);

    const currentTemplateJson = useRef({});
    const undoRef = useRef(() => { });
    const redoRef = useRef(() => { });
    const toggleLeftRef = useRef(() => { });
    const toggleRightRef = useRef(() => { });

    const setControls = useCallback(
        (undo: any, redo: any, toggleLeft: any, toggleRight: any) => {
            undoRef.current = undo;
            redoRef.current = redo;
            toggleLeftRef.current = toggleLeft;
            toggleRightRef.current = toggleRight;
        },
        []
    );

    const setEditorData = (data: any, undo: boolean, redo: boolean) => {
        currentTemplateJson.current = data;
        const isDirty = JSON.stringify(data) !== JSON.stringify(templateJson);
        setTimeout(() => {
            sendMessage({
                type: "template_dirty",
                data: { dirty: isDirty, undo: undo, redo: redo },
            });
        }, 500);
    };

    const saveTemplate = useCallback(() => {
        if (currentTemplateJson.current) {
            sendMessage({
                type: "save_template",
                data: { templateJson: currentTemplateJson.current },
            });
        }
    }, []);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            console.log('[Page Builder] KeyDown:', e.key, 'Ctrl:', e.ctrlKey, 'Meta:', e.metaKey);
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                e.stopPropagation();
                console.log('[Page Builder] Shortcut: Save');
                saveTemplate();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === "z") {
                e.preventDefault();
                e.stopPropagation();
                if (e.shiftKey) {
                    console.log('[Page Builder] Shortcut: Redo');
                    redoRef.current();
                } else {
                    console.log('[Page Builder] Shortcut: Undo');
                    undoRef.current();
                }
            }
            if ((e.ctrlKey || e.metaKey) && e.key === "y") {
                e.preventDefault();
                e.stopPropagation();
                console.log('[Page Builder] Shortcut: Redo');
                redoRef.current();
            }
        };
        // Use capture to ensure we get the event before other handlers
        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [saveTemplate]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const message = event.data;
            switch (message.type) {
                case "populate": {
                    setTemplateJson(null);
                    const {
                        contentData,
                        templateJson: newTemplateJson,
                        isDefaultLocale,
                        permissions: newPermissions,
                        locale: newLocale,
                        enforceTemplateShape: newEnforceTemplateShape,
                    } = message.data;

                    setTimeout(() => {
                        if (contentData) setMetadata(contentData);
                        if (newTemplateJson) setTemplateJson(newTemplateJson);
                        if (newPermissions) setPermissions(newPermissions);
                        setLocale(newLocale || "");
                        setCanEdit(isDefaultLocale);
                        setEnforceTemplateShape(newEnforceTemplateShape);
                    }, 100);
                    break;
                }
                case "save_requested": {
                    saveTemplate();
                    break;
                }
                case "undo_requested": {
                    undoRef.current();
                    break;
                }
                case "redo_requested": {
                    redoRef.current();
                    break;
                }
                case "toggle_left_requested": {
                    toggleLeftRef.current();
                    break;
                }
                case "toggle_right_requested": {
                    toggleRightRef.current();
                    break;
                }
            }
        };
        window.addEventListener("message", handleMessage);

        // Send CHILD_READY after message handler is set up
        console.log('[Editor] Sending CHILD_READY message to parent');
        sendMessage({ type: "child_ready", data: {} });

        return () => window.removeEventListener("message", handleMessage);
    }, [saveTemplate]);

    return (
        <EditorContext.Provider
            value={{
                templateJson: templateJson,
                setEditorData: setEditorData,
                setControls: setControls,
            }}
        >
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>

                {templateJson && permissions.read ? (
                    <Puck
                        config={processConfig({ ...strapi, locale: locale }, config)}
                        data={{ content: [], root: {}, zones: {}, ...templateJson }}
                        metadata={metadata}
                        onPublish={() => { }}
                        overrides={{
                            header: () => <></>,
                            preview: () => <PreviewWrapper />,
                        }}
                        permissions={
                            canEdit || !enforceTemplateShape
                                ? {
                                    delete: permissions.modify,
                                    drag: permissions.modify,
                                    insert: permissions.modify,
                                    duplicate: permissions.modify,
                                    edit: permissions.edit,
                                }
                                : {
                                    delete: false,
                                    drag: false,
                                    insert: false,
                                    duplicate: false,
                                    edit: true,
                                }
                        }
                    />
                ) : null}
            </div>
        </EditorContext.Provider>
    );
}

const PreviewWrapper = ({ }) => {
    const { appState, dispatch, history } = usePuck();
    const { templateJson, setEditorData, setControls } = useContext(EditorContext);

    // Keyboard shortcuts for component actions
    // Keyboard shortcuts for component actions
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Delete selected component (Delete or Backspace key)
            if ((e.key === "Delete" || e.key === "Backspace") && appState.ui.itemSelector) {
                // Ignore if typing in an input or textarea
                const target = e.target as HTMLElement;
                if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                    return;
                }

                e.preventDefault();
                e.stopPropagation();
                console.log('[Page Builder] Shortcut: Delete component');
                const { index, zone } = appState.ui.itemSelector;
                if (index !== undefined) {
                    dispatch({
                        type: "remove",
                        index,
                        zone: zone || "",
                    });
                }
            }

            // Duplicate selected component (Ctrl/Cmd+D)
            if ((e.ctrlKey || e.metaKey) && e.key === "d" && appState.ui.itemSelector) {
                e.preventDefault();
                e.stopPropagation();
                console.log('[Page Builder] Shortcut: Duplicate component');
                const { index, zone } = appState.ui.itemSelector;
                if (index !== undefined) {
                    dispatch({
                        type: "duplicate",
                        sourceIndex: index,
                        sourceZone: zone || "",
                    });
                }
            }
        };

        // Use capture to ensure we get the event before other handlers
        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
    }, [appState.ui.itemSelector, dispatch]);

    useEffect(() => {
        const toggleLeft = () => {
            dispatch({
                type: "setUi",
                ui: { leftSideBarVisible: !appState.ui.leftSideBarVisible },
            });
        };
        const toggleRight = () => {
            dispatch({
                type: "setUi",
                ui: { rightSideBarVisible: !appState.ui.rightSideBarVisible },
            });
        };
        setControls(
            () => history.back(),
            () => history.forward(),
            () => toggleLeft(),
            () => toggleRight()
        );
    }, [
        history.back,
        history.forward,
        appState.ui.leftSideBarVisible,
        appState.ui.rightSideBarVisible,
        setControls,
        dispatch,
    ]);

    useEffect(() => {
        if (!templateJson) return;
        const data = { ...templateJson };
        dispatch({ type: "setData", data: data });
    }, [templateJson, dispatch]);

    useEffect(() => {
        setEditorData(appState.data, history.hasPast, history.hasFuture);
    }, [appState.data, history.hasPast, history.hasFuture, setEditorData]);

    return <Puck.Preview />;
};

export const DropZone: typeof PuckDropZone = PuckDropZone;
export const FieldLabel = PuckFieldLabel;
export const walkTree = puckWalkTree;
export { processProps };
