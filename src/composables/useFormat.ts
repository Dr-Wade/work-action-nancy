export const useFormat = () => {
    const capitalize = (word: string) => word.at(0)!.toUpperCase() + word.slice(1)

    return { capitalize }
}