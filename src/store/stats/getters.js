export function ASSETS (state) {
  return state.assets
}

export function ASSET_BY_ID (state) {
  return assetId => {
    return state.assets
      .filter((asset) => asset.id === assetId)[0]
  }
}

export function ASSETS_GAINERS (state) {
  return state.assets.filter((asset) => asset.change > 0)
}

export function ASSETS_LOSERS (state) {
  return state.assets.filter((asset) => asset.change < 0)
}


export function ASSETS_TOP_GAINERS (state, getters) {
  return maxAmount => {
    return getters.ASSETS_GAINERS
      .sort((a, b) =>  a.change - b.change )
      .slice(0, maxAmount)
  }
}

export function ASSETS_TOP_LOSERS (state, getters) {
  return maxAmount => {
    return getters.ASSETS_LOSERS
      .sort((b, a) => a.change - b.change)
      .slice(0, maxAmount)
  }
}
