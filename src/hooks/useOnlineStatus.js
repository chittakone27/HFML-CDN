import { metadata } from "@/api";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
const { VITE_APP_MODE } = import.meta.env;

const OfflineAlert = Swal.mixin({
  icon: "error",
  showCancelButton: true,
  cancelButtonColor: "#e53935",
  confirmButtonColor: "#0277bd",
  allowOutsideClick: false
});

const useOnlineStatus = () => {
  const { t } = useTranslation();
  useEffect(() => {
    if (VITE_APP_MODE === "icapture") {
      const interval = setInterval(async () => {
        const result = await metadata.ping();
        if (!result) {
          OfflineAlert.fire({
            title: t("error"),
            html: `<div>${t("offlineError")}</div>`,
            confirmButtonText: t("clickHereToReload"),
            showCancelButton: false
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload();
            }
          });
          clearInterval(interval);
        }
      }, 15000);
    }
  }, []);
};

export default useOnlineStatus;
