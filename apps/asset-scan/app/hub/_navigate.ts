import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useGoHub() {
  const router = useRouter();
  const goHub = (hub: string) => {
    router.push("/" + hub);
  }
  return { goHub };
}

export function useGoAsset() {
  const router = useRouter();
  const goAssets = useCallback(() => {
    router.push("/assets")
  }, [])
  const goViewer = useCallback((hub: string, assetId: string) => {
    router.push(`/${hub}/assets/${assetId}`)
  }, [])
  const goCreate = useCallback(() => {
    router.push(`/assets/create`)
  }, [])
  const goEdit = useCallback((hub: string, assetId: string) => {
    router.push(`/${hub}/assets/${assetId}/edit`)
  }, [])
  return {
    goViewer, goCreate, goAssets, goEdit
  }
}
