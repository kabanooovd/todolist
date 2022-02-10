import Token from "../Models/Token";

class TokenServices {
	async saveToke(userId: string, refreshToken: string) {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({ user: userId, refreshToken });
		return token;
	}
}

export default new TokenServices();
