/**
 * @description getShortAddress
 * @param {string}
 * @returns {string}
 */
export function getShortAddress(address: string | undefined) {
  return address ? (address.length > 10 ? `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}` : address) : ''
}