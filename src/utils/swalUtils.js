import Swal from 'sweetalert2';

// Variable to hold the Swal instance for loading
let loadingSwalInstance;

// Function to show loading swal
export const swalLoading = (message = "Please wait...") => {
  // Show loading and store the Swal instance
  loadingSwalInstance = Swal.fire({
    title: message,
    html: 'Processing...',
    allowOutsideClick: false, // Disable outside click to close
    didOpen: () => {
      Swal.showLoading(); // Show loading animation
    }
  });
};

// Function to show success swal
export const swalSuccess = (message = "Operation successful!") => {
  Swal.fire({
    title: 'Success!',
    text: message,
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    // Close the loading swal when success is shown
    if (loadingSwalInstance) {
      loadingSwalInstance.close(); // Close the loading swal
    }
  });
};

// Function to close the loading swal manually
export const closeSwalLoading = () => {
  if (loadingSwalInstance) {
    loadingSwalInstance.close(); // Close the loading swal instance
    loadingSwalInstance = null;
  }
};
