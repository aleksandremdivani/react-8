const DetailsCard = ({label, value}) => (
    <div className="rounded-md w-50 p-3 bg-white/10 backdrop-lg">
        <h3 className="font-semibold text-[20px]">{label}</h3>
        <p>{value}</p>
    </div>
)

export default DetailsCard;