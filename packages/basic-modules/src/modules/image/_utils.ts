// If width/height are px values (or numeric), emit them as HTML attributes on <img>
export function isPxValue(v: string) {
  if (!v) return false
  return /^\d+(?:\.\d+)?px$/.test(v) || /^\d+(?:\.\d+)?$/.test(v)
}

export function pxNumber(v: string) {
  return v.replace(/px$/, '')
}
