import Swal from "sweetalert2";
import "./dialogs.scss";
export const showSuccessDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "success",
        position: "top-end",
        showConfirmButton: false,
        width: 400,
        timer: 1500,
        customClass: {
            popup: 'custom-font-size'
        }
    });

};
export const showErrorDialog = (title: string, text: string) => {
    return Swal.fire({
        title,
        text,
        icon: "error",
        position: "top-end",
        showConfirmButton: false,
        width: 400,
        timer: 2000,
        customClass: {
            popup: 'custom-font-size'
        }
    });
};
export const showConfirmDialog = async (title: string, text: string) => {
    return await Swal.fire({
        title,
        text,
        icon: "warning",
        position: "center",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });
}

const dialogs = { success: showSuccessDialog, error: showErrorDialog, confirm: showConfirmDialog };
export default dialogs;