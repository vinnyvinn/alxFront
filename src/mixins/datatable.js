export default {
    data(){
        return {
            items: [],
            page:1,
            sortBy: 'id',
            loading: true,
            next_count:0
        }
    },
    methods: {
        getItems(){
            if (this.tableData.length > 0 ) {
                this.getDataFromApi()
                    .then(data => {
                        this.items = data.items
                        this.numberOfPages = data.total
                    })
            }
        },
        getDataFromApi () {
            this.loading = true
            return new Promise((resolve) => {
                const { sortBy, sortDesc, page, itemsPerPage } = this.options
                let items = this.tableData;
                const total = this.total_count;

                if (sortBy.length === 1 && sortDesc.length === 1) {
                    items = items.sort((a, b) => {
                        const sortA = a[sortBy[0]]
                        const sortB = b[sortBy[0]]

                        if (sortDesc[0]) {
                            if (sortA < sortB) return 1
                            if (sortA > sortB) return -1
                            return 0
                        } else {
                            if (sortA < sortB) return -1
                            if (sortA > sortB) return 1
                            return 0
                        }
                    })
                }

                if (itemsPerPage > 0) {
                    items = items.slice((page - 1) * itemsPerPage, page * itemsPerPage)
                }

                setTimeout(() => {
                    this.loading = false
                    resolve({
                        items,
                        total,
                    })
                }, 1000)
            })
        },

    }
}
