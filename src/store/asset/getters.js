export function ASSETS (state) {
  return state.assets
}

export function ASSET_BY_ID (state) {
  return assetId => {
    return state.assets.filter((asset) => asset.id === assetId).pop()
  }
}
