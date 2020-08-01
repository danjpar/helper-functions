export default function GroupByPrefix(data) {
    if (!data) {
        data = {
            "0": [
                {name:"data01", type:"foo"},
                {name:"data02", type:"foo"},
                {name:"data03", type:"bar"},
                {name:"nondata01", type:"bar"},
                {name:"nondata02", type:"bar"},
                {name:"otherdata01", type:"foo"},
            ],
            "1": [
                {name:"data11", type:"bar"},
                {name:"data12", type:"bar"},
                {name:"data13", type:"bar"},
                {name:"nondata11", type:"foo"},
                {name:"nondata12", type:"foo"},
                {name:"otherdata11", type:"foo"},
            ],
        };
    }

    const newData = Object.keys(data).map((node, nodeIndex) => {

        /*
            if maintaining some resemblance of the original array order doesn't matter, use sort:

            data[node].sort((a, b) => {
                return (a.name.length > b.name.length ? 1 : b.name.length > a.name.length ? -1 : a - b);
            })
        */

        var arr = [];
        data[node].forEach(x => x.name.replace(/^(.*?)([0-9]*)$/, (string, $1, $2) => arr.push({data:x, prefix:$1, value:$2})));

        const groupedData = arr.reduce((hash, item) => {
            if (!hash.length) {
                hash.push(item);
            } else {
                let compareTo = hash[hash.length-1];
                if (item.prefix === compareTo.prefix && item.data.type === compareTo.data.type){
                    if (Number(item.value) === Number(compareTo.value)+1) {
                        compareTo.placeholder = item.value.length;
                        compareTo.start = Number(compareTo.value);
                        compareTo.count = 2;
                        delete compareTo.value;
                    } else if (compareTo.start && compareTo.count && compareTo.start + compareTo.count === Number(item.value)) {
                        compareTo.count++;
                    } else {
                        hash.push(item)
                    }
                } else {
                    hash.push(item)
                }
            }
            return hash;
        }, []);
        return groupedData;
    });
    return newData;
}
