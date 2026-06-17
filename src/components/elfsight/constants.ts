export const ELFSIGHT_PLATFORM_SCRIPT = "https://elfsightcdn.com/platform.js";

export const ELFSIGHT_WIDGETS = {
  reviews: "3b6e69d4-40e6-449e-aeb5-33a3f19a771a",
  emailPopup: "c18f630a-679b-4ace-ae24-f73137f9f782",
  socialFeed: "b5a8cf17-b181-4349-ad5a-c049dc2d99c2",
  clickToCall: "23ab2b81-9fce-4a3a-babd-f05534a12b1f",
} as const;

export function elfsightAppClass(appId: string) {
  return `elfsight-app-${appId}`;
}
