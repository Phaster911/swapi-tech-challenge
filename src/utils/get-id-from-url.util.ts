export default function getIdFromUrl(url: string) {
  const peopleIndex = url.indexOf("people");
  if (peopleIndex === -1) {
    return "";
  }
  return url.split("people")[1].replaceAll("/", "");
}
