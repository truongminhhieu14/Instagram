export default function getFirstLineOfStatus(content: string): string {
  return content.split("\n")[0];
}