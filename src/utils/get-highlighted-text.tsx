export const getHighlightedText = (textForSearching: string, text: string): JSX.Element[] =>
    textForSearching?.split(new RegExp(`(${text})`, 'gi')).map((match: string) => (
        <span
            key={Math.random()}
            style={match.toLowerCase() === text.toLowerCase() ? { color: 'var(--light-red-4)' } : {}}
        >
            {match}
        </span>
    ));
