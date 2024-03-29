export default function ListItem(props: {title: string, desc: string}) {
    return (
        <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
            <div className="text-sm font-semibold leading-none">{props.title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{props.desc}</p>
        </div>
    )
}