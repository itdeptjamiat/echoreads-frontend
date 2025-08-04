import z from "zod";

const email = z
.string()
.min(1, 'Email is required')
.email('Please enter a valid email address');/// use manual checking 
