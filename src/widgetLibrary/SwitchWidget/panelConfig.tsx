import { HorizontalStartIcon, HorizontalEndIcon } from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"

import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const SWITCH_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "switch-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "switch-basic-defaultValue",
        labelName: "editor.inspect.setter_label.default_value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        placeholder: "{{false}}",
      },
    ],
  },
  {
    id: "switch-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "switch-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "switch-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "switch-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      {
        id: "switch-label-alignment",
        labelName: "editor.inspect.setter_label.label_alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "left",
          },
          {
            label: <HorizontalEndIcon />,
            value: "right",
          },
        ],
      },
      {
        id: "switch-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "switch-interaction",
    groupName: "editor.inspect.setter_group.interaction",
    children: [
      {
        id: "switch-interaction-event-handler",
        attrName: "events",
        labelName: "editor.inspect.setter_label.event_handler",
        labelDesc: "xxxxx",
        setterType: "EVENT_HANDLER_SETTER",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "event",
            labelName: "editor.inspect.setter_label.event",
            setterType: "BASE_SELECT_SETTER",
            attrName: "eventType",
            options: [{ label: "Change", value: "onChange" }],
          },
          {
            id: "action",
            labelName: "editor.inspect.setter_label.action",
            setterType: "EVENT_ACTION_SELECT_SETTER",
            attrName: "actionType",
            options: [
              {
                label: "editor.inspect.setter_label.trigger_query",
                value: "datasource",
              },
              {
                label: "editor.inspect.setter_label.control_component",
                value: "widget",
              },
              {
                label: "editor.inspect.setter_label.run_script",
                value: "script",
              },
              {
                label: "editor.inspect.setter_label.go_to_url",
                value: "openUrl",
              },
              {
                label: "editor.inspect.setter_label.show_notification",
                value: "showNotification",
              },
            ],
          },
          {
            id: "query",
            labelName: "Query",
            setterType: "EVENT_TARGET_ACTION_SELECT_SETTER",
            attrName: "queryID",
            bindAttrName: "actionType",
            shown: (type) => type === "datasource",
          },
          {
            id: "actionMethod",
            labelName: "Action Method",
            setterType: "BASE_SELECT_SETTER",
            attrName: "widgetMethod",
            bindAttrName: "queryID",
            shown: (type) => type === "datasource",
            // TODO: value should as same as action run method name that mounted on `globalData`
            options: [{ label: "run", value: "executeAction" }],
          },
          {
            id: "Method",
            labelName: "Method",
            setterType: "EVENT_WIDGET_METHOD_SELECT_SETTER",
            attrName: "widgetMethod",
            bindAttrName: "widgetID",
            shown: (widgetID) => !!widgetID,
          },
          {
            id: "Value",
            labelName: "Value",
            setterType: "INPUT_SETTER",
            attrName: "widgetTargetValue",
            bindAttrName: "widgetMethod",
            shown: (widgetMethod) => widgetMethod === "setValue",
          },
          {
            id: "disabled",
            labelName: "editor.inspect.setter_label.disabled",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "disabled",
            bindAttrName: "type",
            useCustomLayout: true,
            shown: (type) => type === "widget",
          },
          {
            id: "script",
            setterType: "INPUT_SETTER",
            attrName: "script",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "script",
          },
          {
            id: "URL",
            labelName: "URL",
            setterType: "INPUT_SETTER",
            attrName: "url",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "openUrl",
          },
          {
            id: "newTab",
            labelName: "New Tab",
            setterType: "DYNAMIC_SWITCH_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "newTab",
            bindAttrName: "actionType",
            useCustomLayout: true,
            shown: (type) => type === "openUrl",
          },
          {
            id: "title",
            labelName: "Title",
            setterType: "INPUT_SETTER",
            attrName: "title",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.STRING,
            shown: (type) => type === "showNotification",
          },
          {
            id: "description",
            labelName: "Description",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.STRING,
            attrName: "description",
            bindAttrName: "actionType",
            shown: (type) => type === "showNotification",
          },
          {
            id: "notification-type",
            labelName: "Type",
            setterType: "BASE_SELECT_SETTER",
            attrName: "notificationType",
            bindAttrName: "actionType",
            shown: (type) => type === "showNotification",
            options: [
              { label: "Success", value: "success" },
              { label: "Error", value: "error" },
              { label: "Warning", value: "warning" },
              { label: "Info", value: "info" },
            ],
          },
          {
            id: "duration",
            labelName: "Duration",
            setterType: "INPUT_SETTER",
            attrName: "duration",
            bindAttrName: "actionType",
            expectedType: VALIDATION_TYPES.NUMBER,
            shown: (type) => type === "showNotification",
          },
          {
            id: "enabled",
            labelName: "Only run when",
            labelDesc: "xxxxx",
            setterType: "INPUT_SETTER",
            expectedType: VALIDATION_TYPES.BOOLEAN,
            attrName: "enabled",
          },
        ],
      },
      {
        id: "switch-interaction-disabled",
        labelName: "editor.inspect.setter_label.disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "{{false}}",
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "switch-Adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "switch-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "switch-validation",
    groupName: "editor.inspect.setter_group.validation",
    children: [
      {
        id: "switch-validation-required",
        labelName: "editor.inspect.setter_label.required_field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "required",
      },
      {
        id: "switch-validation-hide-message",
        labelName: "editor.inspect.setter_label.hide_validation_message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        useCustomLayout: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "switch-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "switch-layout-hidden",
        labelName: "editor.inspect.setter_label.hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        placeholder: "false",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `switch-style`,
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "switch-style",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "switch-style-radius",
            labelName: "editor.inspect.setter_label.theme_color",
            attrName: "colorScheme",
            setterType: "COLOR_PICKER_SETTER",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
