class LocalStorageProvider {
    save(key, item) {
        try {
            const serializedItem = JSON.stringify(item);
            localStorage.setItem(key, serializedItem);
        } catch (err) {
            throw new Error(err);
        }
    }
    get(key) {
        let result;
        try {
            const serializedItem = localStorage.getItem(key);
            result = JSON.parse(serializedItem);
        } catch (err) {
            result = undefined;
        }
        return result;
    }
    getUpdatedStorage(key, callback) {
        const item = this.get(key)
        const updatedItem = callback(item)
        this.save(key, updatedItem)
        return updatedItem
    }
}

export default new LocalStorageProvider();