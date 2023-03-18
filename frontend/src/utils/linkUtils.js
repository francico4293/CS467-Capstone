const formatLink = (link) => {
    if (link.length >= 8 && link.slice(0, 8) === "https://") {
        return link.slice(8);
    }

    return link;
}

module.exports = { formatLink };
