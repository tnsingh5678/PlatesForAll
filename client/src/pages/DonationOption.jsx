import DonationOptionCard from "../components/DonationOptionCard";

const DonationOption = () => {
    const Options = [
        {
            imageLink: "/images/orphanage.webp", 
            title: "Orphanage", 
            redirectLink: "http://localhost:5173/donation/orphange"
        },
        {
            imageLink: "/images/food_bank.jpeg", 
            title: "Food Bank", 
            redirectLink: "http://localhost:5173/donation/food-bank"
        },
        {
            imageLink: "/images/disaster_relief.jpg", 
            title: "Disaster Relief", 
            redirectLink: "http://localhost:5173/donation/disaster-relief"
        },
        {
            imageLink: "/images/homeless.avif", 
            title: "Homeless Shelter", 
            redirectLink: "http://localhost:5173/donation/homeless-shelter"
        },
        {
            imageLink: "/images/School.jpg", 
            title: "Educational Institution", 
            redirectLink: "http://localhost:5173/donation/education-fund"
        },
    ];
    

    return (
        <>
            {Options.map((option, index) => (
                <DonationOptionCard 
                    key={index} 
                    link={option.imageLink} 
                    redirectLink={option.redirectLink} 
                    title={option.title} 
                />
            ))}
        </>
    );
};

export default DonationOption;
