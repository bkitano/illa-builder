import { createAction } from "@/api/actions"
import { authCloudRequest, builderRequest } from "@/api/http"
import {
  REDIRECT_PAGE_TYPE,
  fetchInviteLinkResponse,
  inviteByEmailResponse,
} from "@/illa-public-component/MemberList/interface"
import { USER_ROLE } from "@/illa-public-component/UserRoleUtils/interface"
import { DeployResp } from "@/page/App/components/PageNavBar/resp"
import { CurrentAppResp } from "@/page/App/resp/currentAppResp"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getCanvas } from "@/redux/currentApp/editor/components/componentsSelector"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { dashboardAppActions } from "@/redux/dashboard/apps/dashboardAppSlice"
import { DashboardApp } from "@/redux/dashboard/apps/dashboardAppState"
import store from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"

interface IAPPPublicStatus {
  isPublic: boolean
}
export const fetchAPPPublicStatus = async (
  appID: string,
  teamIdentifier?: string,
  signal?: AbortSignal,
) => {
  return builderRequest<IAPPPublicStatus>(
    {
      url: `/publicApps/${appID}/isPublic`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamIdentifier: true,
      teamIdentifier,
    },
  )
}

export const fetchPubicAppInitData = (
  appID: string,
  versionID: string,
  teamIdentifier?: string,
  signal?: AbortSignal,
) => {
  return builderRequest<CurrentAppResp>(
    {
      url: `/publicApps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamIdentifier: true,
      teamIdentifier,
    },
  )
}

export const fetchPrivateAppInitData = async (
  appID: string,
  versionID: string,
  teamIdentifier?: string,
  signal?: AbortSignal,
) => {
  return await builderRequest<CurrentAppResp>(
    {
      url: `/apps/${appID}/versions/${versionID}`,
      method: "GET",
      signal: signal,
    },
    {
      needTeamID: true,
      teamIdentifier,
    },
  )
}

export const fetchDeployApp = (appID: string, isPublic?: boolean) => {
  return builderRequest<DeployResp>(
    {
      url: `/apps/${appID}/deploy`,
      method: "POST",
      data: {
        public: isPublic,
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchChangeAppSetting = (
  appID: string,
  appName: string,
  description?: string,
) => {
  return builderRequest(
    {
      url: `/apps/${appID}`,
      method: "PUT",
      data: {
        appName,
        config: {
          description,
        },
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const fetchAppList = (signal: AbortSignal) => {
  return builderRequest<DashboardApp[]>(
    {
      url: "/apps",
      method: "GET",
      signal: signal,
    },
    {
      needTeamID: true,
    },
  )
}

interface IAppCreateRequestData {
  appName: string
  initScheme: ComponentNode
}
export const fetchCreateApp = (data: IAppCreateRequestData) => {
  return builderRequest<DashboardApp>(
    {
      url: "/apps",
      method: "POST",
      data,
    },
    { needTeamID: true },
  )
}

export const fetchDeleteApp = (appID: string) => {
  return builderRequest<{ appID: string }>(
    {
      url: `/apps/${appID}`,
      method: "DELETE",
    },
    { needTeamID: true },
  )
}

export const fetchCopyApp = (appID: string, name: string) => {
  return builderRequest<DashboardApp>(
    {
      url: `/apps/${appID}/duplication`,
      method: "POST",
      data: {
        appName: name,
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const shareAppByEmail = async (
  email: string,
  userRole: USER_ROLE,
  appID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<inviteByEmailResponse>(
    {
      method: "POST",
      url: `/shareAppByEmail`,
      data: {
        email,
        userRole,
        appID,
        redirectPage,
        hosts: !isCloudVersion ? window.location.origin : undefined,
      },
    },
    { needTeamID: true },
  )
  return response.data
}

export const fetchShareAppLink = async (
  userRole: USER_ROLE,
  appID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/shareAppLink/userRole/${userRole}/apps/${appID}/redirectPage/${redirectPage}`,
    },
    { needTeamID: true },
  )
  return response.data
}

export const renewShareAppLink = async (
  userRole: USER_ROLE,
  appID: string,
  redirectPage?: REDIRECT_PAGE_TYPE,
) => {
  const response = await authCloudRequest<fetchInviteLinkResponse>(
    {
      method: "GET",
      url: `/newShareAppLink/userRole/${userRole}/apps/${appID}/redirectPage/${redirectPage}`,
    },
    {
      needTeamID: true,
    },
  )
  return response.data
}

export const updateAppPublicConfig = async (
  isPublic: boolean,
  appID: string,
) => {
  await builderRequest<fetchInviteLinkResponse>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        public: isPublic,
      },
    },
    {
      needTeamID: true,
    },
  )
  return true
}

export const updateWaterMarkConfig = async (
  waterMark: boolean,
  appID: string,
) => {
  return builderRequest<DashboardApp>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: {
        waterMark,
      },
    },
    {
      needTeamID: true,
    },
  )
}

export const updateAppConfig = async (
  appID: string,
  config: {
    public?: boolean
    waterMark?: boolean
    description?: string
    appName?: string
  },
) => {
  return builderRequest<DashboardApp>(
    {
      method: "PATCH",
      url: `/apps/${appID}/config`,
      data: config,
    },
    {
      needTeamID: true,
    },
  )
}

export const createApp = async (appName: string, initScheme: ComponentNode) => {
  const requestData = { appName, initScheme }
  const response = await fetchCreateApp(requestData)
  store.dispatch(
    dashboardAppActions.addDashboardAppReducer({
      app: response.data,
    }),
  )
  return response.data.appId
}

export const forkCurrentApp = async (appName: string) => {
  const actions = getActionList(store.getState())
  const rootComponentNode = getCanvas(store.getState()) as ComponentNode
  // fork app
  const appId = await createApp(appName, rootComponentNode)
  // fork actions
  await Promise.all(
    actions.map((data) => {
      return createAction(appId, data)
    }),
  )
  return appId
}
