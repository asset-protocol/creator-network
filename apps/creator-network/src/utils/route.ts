import { useAssetHub } from "@repo/ui/asset";
import { useCallback } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

export function useGoHome() {
  const { hubInfo } = useAssetHub();
  const navigate = useNavigate();
  return useCallback(() => {
    navigate(`/${hubInfo?.name ?? "home"}`)
  }, [hubInfo])
}

export function useNavigateAssetHub() {
  const { hubInfo } = useAssetHub();
  const navigate = useNavigate();
  return useCallback((to: string, opts?: NavigateOptions) => {
    if (to.startsWith("/")) {
      // navigate(`/${hubInfo?.name}${to}`, opts)
      navigate(`${to}`, opts)
    } else {
      // navigate(`/${hubInfo?.name}/${to}`, opts)
      navigate(`/${to}`, opts)
    }
  }, [hubInfo])
}