const Footer = () => {
    return (
        <div className="flex items-center justify-center bg-indigo-400 w-full p-5 gap-2 mt-auto">
            &copy; { new Date().getFullYear() } Feito por <strong>Eduardo Felipe</strong>
        </div>
    )
}

export default Footer