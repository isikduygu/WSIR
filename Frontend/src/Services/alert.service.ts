// import { Injectable } from '@angular/core';
// import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

// @Injectable({
//   providedIn: 'root'
// })
// export class AlertService {

//   constructor() { }
//   toast = Swal.mixin({
//     toast: true,
//     position: 'top-end',
//     showConfirmButton: false,
//     timer: 2000,
//     timerProgressBar: true,
//     // didOpen: (toast) => {
//     //   toast.addEventListener('mouseenter', Swal.stopTimer);
//     //   toast.addEventListener('mouseleave', Swal.resumeTimer);
//     // },
//   });

//   showToast(options: SweetAlertOptions) {
//     this.toast.fire(options);
//   }

//   showNotification(title: string, html: string, confirmButtonText: string) {
//     Swal.fire({
//       title: title,
//       text: html,
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: confirmButtonText
//     })
//   }
// }
