const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post('/register',
	[
		check('email', 'nekorrektniy email').isEmail(),
		check('password', 'minimalnaya dlina parolya 6 simvolov')
		.isLength({min:6})
	],
 	async (req, res) => {
	try {
		const errors = validationResult(req)
		if(!errors.isEmpty()) {
			return await res.status(400).json({
				errors:errors.array(),
				message:'nekorrektnie dannie pri registratsii'
			})
		}
		const {email, password} = req.body
		const candidate = await User.findOne({email})
		console.log(candidate)
		if(candidate) {
			return res.status(400).json({
				message:"takoy polzavatel uje sushestvuyet "
			})
		}
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({email, password:hashedPassword})
		await user.save()
		res.status(201).json({message:"polzovatel sozdan"})

	} catch(e) {
		console.log('sudba ne pozvolit', e)
		res.status(500).json({message:"error server ups"})
	}
})
router.post(
	'/login',
	[
		check('email', 'Vvedite korrektniy email').normalizeEmail().isEmail(),
		check('password', 'Vvedite parol').exists()
	],
	
 	async (req, res) => {
		try {
			const errors = validationResult(req)
			if(!errors.isEmpty()) {
				return res.status(400).json({
					errors:errors.array(),
					message:'nekorrektnie dannie pri registratsii'
				})
			}
			const {email, password} = req.body
			const user = await User.findOne({email})
			if(!user) {
				return res.status(400).json({
					message:'polzavatel ne nayden'
				})
			}
			const isMatch = await bcrypt.compare(password, user.password)
			if(!isMatch) {
				return res.status(400).json({message:'Neverniy parol'})
			}
			const token = jwt.sign(
				{userId: user.id},
				config.get('jwtSecret')
			)
			res.json({token, userId: user.id})			
		} catch(e) {
			// statements
			res.status(500).json({message:"error server ups"})
		}
	}
)


module.exports = router