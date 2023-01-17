

const imageUrlNull = ""

const imageUrl = "db60be12-6c80-46c5-9276-82d2a86cab23"


const mockedCreateDonation = {
    name: "Televisão",
    description: "Televisão Seminova funcionando perfeitamente",
    image: "http://www.teste.com.br/images/asdasdasdsd.png",
    category: imageUrl
}
const mockedCreateDonationTwo = {
    name: "Televisão LG",
    description: "Televisão funcionando perfeitamente",
    image: "http://www.teste.com.br/images/asdasd.png",
    category: imageUrl
}

const mockedCreateDonationThree = {
    name: "Notebook CCE",
    description: "funcionando perfeitamente",
    image: "http://www.teste.com.br/images/asDASDASDASDC12346d.png",
    category: imageUrl
}

const mockedInvalidDonation = {
    name: "",
    description: "",
    image: "http://www.teste.com.br/images/asdasdasdsd.png",
    category: imageUrl

}

const mockedDonationToUpdate = {
    name: "Televisão 50 Polegadas",
    description: "Televisor funcionando perfeitamente, estado de seminovo"
}

const mockedDonationToUpdateIsActive = {
    name: "Televisão 50 Polegadas",
    description: "Televisor funcionando perfeitamente, estado de seminovo"
}

export {
    mockedCreateDonation, 
    mockedInvalidDonation, 
    mockedDonationToUpdate,
    mockedCreateDonationTwo,
    mockedDonationToUpdateIsActive,
    mockedCreateDonationThree
}


