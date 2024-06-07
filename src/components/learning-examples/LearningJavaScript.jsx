const person = 
{
    name : 'Hanumansetti Nikhil',
    address: 
    {
        country:'India',
        city:'Hyderabad',   
    },
    profiles: ['twitter','LinkedIn','instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile)
        )
    },
}

export default function LearningJavaScript()
{
    return(
        <div>
        <div>{person.name} is Learning JavaScript</div>
        <div>{person.name} is living in {person.address.country} and he is from {person.address.city}</div>
        <div>{person.profiles[2]}</div>
        <div>{person.printProfile()}</div>
        </div>
    )
}