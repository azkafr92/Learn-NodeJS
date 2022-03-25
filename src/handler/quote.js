class Handler {
	constructor(service) {
		this.service = service
	}
	v1GetQuote = (req, res) => {
		this.service.getQuote().then(resp => {
			if (resp) {
				res.status(resp.status).json(resp.data)
				return;
			}
			res.status(500).send('Something wrong when trying to get quote')
		})
	};
}

module.exports = Handler;
