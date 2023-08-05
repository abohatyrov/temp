import Swal from "sweetalert2";

const AlertTypes = {
  Error: "error",
  Success: "success",
  Confirmation: "confirmation",
};

function HideAlert(setAlertState) {
  setAlertState(null);
}

function ShowAlert(message, type, autoclose) {
  switch (type) {
    case AlertTypes.Error:
      Swal.fire({
        icon: "error",
        title: "Ой. Виникла Помилка",
        text: message,
      });
      break;
    case AlertTypes.Info:
      Swal.fire({
        icon: "info",
        title: "",
        text: message,
      });
      break;
    case AlertTypes.Success:
      Swal.fire({
        icon: "success",
        title: "OK",
        text: message,
        timer: autoclose ? 1000 : 0,
      });
      break;
    default: {
      console.error("Unsupported alert type");
      break;
    }
  }
}

function ShowConfirmationAlert(
  confirmTitle,
  confirmButton,
  confirmAction,
  prop
) {
  Swal.fire({
    title: confirmTitle,
    showCancelButton: true,
    confirmButtonText: confirmButton,
    cancelButtonText: "Відміна",
  }).then((result) => {
    if (result.isConfirmed) {
      confirmAction(prop);
    }
  });
}
export { ShowAlert, HideAlert, ShowConfirmationAlert, AlertTypes };
