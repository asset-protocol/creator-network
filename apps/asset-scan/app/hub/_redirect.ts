import { redirect } from "next/navigation";
export function redirectHub(hub: string) {
  redirect("/" + hub);
}
export function redirectAssets() {
  redirect("/assets");
}

export function redirectTheAsset(hub: string, assetId: string) {
  redirect(`/${hub}/asset/${assetId}`);
}

export function redirectAssetCreate(hub?: string) {
  redirect("/assets/create");
}

export function redirectAssetEdit(hub: string, assetId: string) {
  redirect(`/${hub}/asset/${assetId}/edit`);
}
