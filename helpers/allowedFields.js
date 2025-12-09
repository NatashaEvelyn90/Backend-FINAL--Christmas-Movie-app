module.exports = {

program:[
    "program_id",
    "title",
    "yr_released",
    "runtime",
    "producer_id",
    "format",
    "age_restrict",
    "rating",
    "img_url",
    "description"
],

director:[
    "director_id",
    "first_name",
    "last_name"
],

actor:[
    "actor_id",
    "first_name",
    "last_name"
],

streaming:[
    "streaming_platform_id",
    "streaming_platform"
],

producer:[
    "producer_id",
    "producer"
],

program_to_actor: [
    "program_id",
    "actor_id"
],
    
program_to_director: [
    "program_id",
    "director_id"
    ],

program_to_streaming: [
    "program_id", 
    "streaming_platform_id"
],

program_to_producer: [
    "program_id", 
    "producer_id"
]
}
