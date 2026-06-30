import type { BannerSettings } from "./config";

interface Banner {
  show: () => void;
  hide: () => void;
  destroy: () => void;
}

export const createBanner = (
  settings: BannerSettings,
  onAccept: () => void,
  onReject: () => void,
): Banner => {
  // Build the elements of the banner
  const bannerContainer = document.createElement("div");
  bannerContainer.setAttribute("id", "cookie-consent-banner");

  const bannerTitle = document.createElement("p");
  bannerTitle.textContent = "We use cookies";
  bannerTitle.setAttribute("id", "cookie-banner-title");

  const bannerBodyText = document.createElement("p");
  bannerTitle.textContent = settings.message;
  bannerBodyText.setAttribute("id", "cookie-banner-body");

  const acceptButton = document.createElement("button");
  acceptButton.setAttribute("id", "cookie-banner-accept-button");
  acceptButton.textContent = settings.acceptText;

  const rejectButton = document.createElement("button");
  rejectButton.setAttribute("id", "cookie-banner-reject-button");
  rejectButton.textContent = settings.rejectText;

  // Wire up the buttons to functions
  acceptButton.onclick = onAccept;
  rejectButton.onclick = onReject;

  // Assemble everything and return it all
  bannerContainer.append(bannerTitle, bannerBodyText, acceptButton, rejectButton);
  const show = () => {
    document.body.appendChild(bannerContainer);
  };
  const hide = () => {
    bannerContainer.remove();
  };
  const destroy = () => {
    acceptButton.onclick = null;
    rejectButton.onclick = null;
    bannerContainer.remove();
  };

  return { show, hide, destroy };
};
