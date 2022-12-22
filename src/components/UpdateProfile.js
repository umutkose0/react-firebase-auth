import { useState } from "react"
import { updateUser } from "./../firebase"
export default function UpdateProfile({name,phone})
{
    const [displayName,setDisplayName]=useState(name);
    const [number,setNumber]=useState(phone);
    const handleSubmit=async(e)=>{
        e.preventDefault();
       await updateUser({displayName})
    }
    return(
        <form onSubmit={handleSubmit} className="w-2/5">
             <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label for="email-address" class="sr-only">Display Name</label>
                <input value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}} id="email-address" name="email" type="text" autocomplete="email" required class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Display name"/>
              </div>
            </div>
            <div>
              <button disabled={!displayName} type="submit" class="disabled:opacity-60 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                update profile
              </button>
            </div>
        </form>
    )
}