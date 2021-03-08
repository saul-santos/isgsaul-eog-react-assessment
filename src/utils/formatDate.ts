function formatDate(value: string) {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleTimeString();
}

export default formatDate;
