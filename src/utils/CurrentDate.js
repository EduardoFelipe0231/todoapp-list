export const currentDate = () => {
    const d = new Date();
    
    const f = new Intl.DateTimeFormat("pt-br", {
      day: '2-digit',
      month: "long",
      year: 'numeric',
    })

    return f.format(d)
}

 