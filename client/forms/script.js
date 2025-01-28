const reservationForm = document.getElementById('reservationForm')
const successMessage = document.getElementById('successMessage');

const urlParams = new URLSearchParams(window.location.search);
const offerId = urlParams.get('offerId');

reservationForm.addEventListener('submit', async function (event) {
    event.preventDefault()


    const params = new URLSearchParams(window.location.search)
    const offerId = params.get('offerId')
    const checkin = params.get('checkin')
    const checkout = params.get('checkout')
    const adults = parseInt(params.get('adults'))
    const children = parseInt(params.get('children'))

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        phoneCode: document.getElementById('phoneCode').value,
        offerId: offerId,
        checkIn: checkin,
        checkOut: checkout,
        totalGuests: adults + children,
    }

    // if (!formData.offerId || !formData.checkIn || !formData.checkOut || !formData.totalGuests) {
    //     alert("Brakuje danych dotyczących rezerwacji!")
    //     return
    // }

    try {
        const response = await fetch('/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.error || 'Nie udało się zapisać rezerwacji.')
        }
        successMessage.style.display = 'block'
        // alert(responseData.message)
        setTimeout(() => {
            window.location.href = '/'//jak uplynei timeout to idzie przekierowanie na strone glowną search
        }, 4000); 
    } catch (error) {
        alert(error.message)
    }
});