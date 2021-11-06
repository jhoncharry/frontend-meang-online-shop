import Swal from 'sweetalert2';

const swalWithBasicOptions = (title: string, html: string) =>
  Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancel',
    showCancelButton: true,
  });

export async function basicGenreForm(title: string, html: string) {
  return await swalWithBasicOptions(title, html).fire({
    didRender: () => {
      const element = document.getElementById('name') as HTMLInputElement;
      element.selectionStart = element.value.length;
    },
    preConfirm: () => {
      const value = (document.getElementById('name') as HTMLInputElement).value;
      if (value) {
        return value;
      }
      Swal.showValidationMessage('You must add a genre');
      return;
    },
  });
}

export async function alertWithTwoOptions(
  title: string,
  text: string,
  confirmButtonText: string = 'Confirm',
  cancelButtonText: string = 'Cancel',
  confirmButtonColor: string = '#6c757d',
  cancelButtonColor: string = '#dc3545'
) {
  return Swal.fire({
    title,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster',
    },
    text,
    showCancelButton: true,
    showCloseButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) return true;
    if (result.isDismissed && result.dismiss?.toString() === 'cancel')
      return false;
    return;
  });
}
