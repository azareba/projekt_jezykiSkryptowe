CREATE TABLE KLIENT (
    id_klienta INT AUTO_INCREMENT PRIMARY KEY,
    imie VARCHAR(255) NOT NULL,
    nazwisko VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tel VARCHAR(20)
);

CREATE TABLE OBIEKT (
    id_obiektu INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(100),
    miasto VARCHAR(100),
    adres VARCHAR(100),
    maxOsob INT,
    wspX FLOAT,
    wspY FLOAT,
    jpg VARCHAR(200),
    opis VARCHAR(200),
    cena INT
);

CREATE TABLE REZERWACJE (
    id_rezerwacji INT AUTO_INCREMENT PRIMARY KEY,
    id_klienta INT,
    id_obiektu INT,
    osoby INT,
    data_zameldowania DATE,
    data_wymeldowania DATE,
    FOREIGN KEY (id_klienta) REFERENCES KLIENT(id_klienta) ON DELETE CASCADE,
    FOREIGN KEY (id_obiektu) REFERENCES OBIEKT(id_obiektu) ON DELETE CASCADE
)

INSERT INTO OBIEKT (nazwa, miasto, adres, maxOsob, wspX, wspY, jpg, opis, cena) 
VALUES 
('Hotel Nadmorski', 'Gdańsk', 'ul. Bałtycka 12', 100, 54.42067, 18.58552, 'hotel_nadmorski.jpg', 'Luksusowy hotel położony nad morzem, idealny na wakacyjny wypoczynek.',800),
('Apartament Rynek', 'Kraków', 'Rynek Główny 15', 6, 50.06143, 19.93658, 'apartament_rynek.jpg', 'Przestronny apartament z widokiem na Sukiennice, doskonały wybór dla par i rodzin.',1200),
('Pensjonat Stare Miasto', 'Warszawa', 'ul. Krakowskie Przedmieście 20', 25, 52.24211, 21.01756, 'pensjonat_stare_miasto.jpg', 'Przytulny pensjonat w historycznej części Warszawy, idealny na city break.',3000);
