import React from 'react'

export default function Login(){
    return(
        <div>
            <div>
                <form>
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder='Enter Email' />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder='Enter Password' />
                    </div>
                    <button>Log in</button>
                    <button>Create Account</button>
                </form>
            </div>
        </div>
    );
}