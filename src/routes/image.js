
const {Router}=require('express');
const router= Router()
const image= require('../controllers')


//buscar imagen por id
router.get('/:image_id', image.getImage )
router.post('/',image.createImage)
router.post('/:image_id/like',image.likeImage)
router.post('/:image_id/dislike',image.dislikeImage)
router.post('/:image_id/comment',image.commentImage)
router.delete('/:image_id',image.removeImage)

module.exports=router