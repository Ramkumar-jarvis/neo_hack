import React from 'react';

function LoginPage() {
    return (
        <div className="t-min-h-screen t-flex t-items-center t-justify-center t-bg-neutral-4 t-py-12 t-px-4 t-sm:px-6 t-lg:px-8">
            <div className="t-max-w-md t-w-full t-space-y-8 t-bg-white t-p-6 t-rounded-lg t-shadow-md">
                <div>
                    <h2 className="t-mt-6 t-text-center t-text-2xl t-font-bold t-text-primary">
                        Sign in to your account
                    </h2>
                </div>
                <form className="t-mt-8 t-space-y-6">
                    <div className="t-rounded-md t-shadow-sm t-space-y-px">
                        <div>
                            <label htmlFor="email-address" className="t-sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="t-appearance-none t-rounded-md t-relative t-block t-w-full t-px-3 t-py-2 t-border t-border-neutral-2 t-placeholder-neutral-1 t-text-black t-focus:outline-none t-focus:ring-primary t-focus:border-primary t-sm:text-sm" placeholder="Email address" />
                        </div>
                        <div>
                            <label htmlFor="password" className="t-sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="t-appearance-none t-rounded-md t-relative t-block t-w-full t-px-3 t-py-2 t-border t-border-neutral-2 t-placeholder-neutral-1 t-text-black t-focus:outline-none t-focus:ring-primary t-focus:border-primary t-sm:text-sm" placeholder="Password" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="t-group t-relative t-w-full t-flex t-justify-center t-py-2 t-px-4 t-border t-border-transparent t-text-sm t-font-medium t-rounded-md t-text-white t-bg-primary t-hover:bg-accent-1 t-focus:outline-none t-focus:ring-2 t-focus:ring-offset-2 t-focus:ring-primary">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
