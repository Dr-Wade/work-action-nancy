export const useCsv = () => {

    const file2string = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            const readFile = () => {
                const str = reader.result as string
                resolve(str)
            }
            reader.addEventListener('load', readFile)
            reader.readAsText(file)
        })
    }
      
    const makeUnique = (arr: Array<string>) => {
        let result: Array<string> = []
        arr.forEach((el) => {
            let i = 0
            const getName = () => el + (i == 0 ? '' : i)
            while (result.indexOf(getName()) != -1) i++
            result.push(getName())
        })
        return result
    }
      
    const csvToArray = (str: string, delimiter = ",") => {
        const headers = makeUnique(str.slice(0, str.indexOf("\n")).split(delimiter).map((el) => el.replaceAll('"', '').trim()))
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
        const arr = rows.map((row) => {
            const values = row.split(delimiter);
            const el = headers.reduce((object, header, index) => {
                if (!values[index]) return object
                object[header] = values[index].replaceAll('"', '').trim();
                return object;
            }, {} as {[key: string]: any});
            return el
        }).filter((row) => Object.keys(row).length > 0)
        return arr
    }

    return {
        file2string,
        csvToArray
    }
}