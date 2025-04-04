const DonationOptionCard = ({ title, link, redirectLink }) => {
    const redirect = (redirectLink) => {
        window.location.href = redirectLink;  
    }

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <div className="w-50 h-60 overflow-hidden rounded-lg">
                <img src={link} alt={title} className="object-cover w-full h-full" 
                onError={() => console.log("Image failed to load")}/>
            </div>
            <div className="mt-4">
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>
            <button 
                onClick={() => redirect(redirectLink)} 
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Donate
            </button>
        </div>
    );
}

export default DonationOptionCard;
