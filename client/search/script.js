const searchForm = document.getElementById('searchForm')
const offersResult = document.getElementById('offersResult')


searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = {
    destination: document.getElementById('destination').value,
    checkin: document.getElementById('checkin').value,
    checkout: document.getElementById('checkout').value,
    adults: document.getElementById('adults').value,
    children: document.getElementById('children').value,
    rooms: document.getElementById('rooms').value,
  };

  try {
    // do endpointu /search
    const response = await fetch('/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Błąd w wyszukiwaniu ofert');
    }

    const offers = await response.json();

    // czyszczenie poprzednich wyników
    offersResult.innerHTML = ''

    if (offers.length === 0) {
      offersResult.innerHTML = '<p>Brak dostępnych ofert dla podanych kryteriów.</p>'
    } else {
      offers.forEach((offer) => {
        const offerElement = document.createElement('div')
        offerElement.className = 'offer'

        offerElement.innerHTML = `
          <h3>${offer.nazwa}</h3>
          <p>Adres: ${offer.miasto}, ${offer.adres}</p>
          <p>Cena: ${offer.cena} zł/noc</p>
          <p>Opis: ${offer.opis}</p>
          <button class="reserve-button" data-offer-id="${offer.id_obiektu}">Zarezerwuj</button>
        `
        offersResult.appendChild(offerElement)
      })
    }
  } catch (error) {
    console.error('Błąd podczas wyszukiwania ofert:', error)
    alert('Wystąpił problem z wyszukiwaniem ofert. Spróbuj ponownie później.')
  }
});

offersResult.addEventListener('click', function (event) {
  if (event.target.classList.contains('reserve-button')) {
    const offerId = event.target.dataset.offerId

    const checkin = document.getElementById('checkin').value
    const checkout = document.getElementById('checkout').value
    const adults = document.getElementById('adults').value
    const children = document.getElementById('children').value


    window.location.href = `/forms.html?offerId=${offerId}&checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}`
  }
})
