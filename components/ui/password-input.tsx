"use client"

import { useId, useMemo, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, Lock, XIcon } from "lucide-react"
import { ControllerRenderProps, UseFormRegisterReturn } from "react-hook-form"
import { ZodString } from "zod"

import { Input } from "@/components/ui/input"

type RegexRequirement = {
  regex: RegExp
  message: string
}

function extractRegexRequirements(schema: ZodString): RegexRequirement[] {
  const requirements: RegexRequirement[] = []

  const checks = schema._def.checks as Array<any>

  for (const check of checks) {
    if (check.kind === "regex") {
      requirements.push({
        regex: check.regex,
        message: check.message ?? "فرمت نادرست",
      })
    }
  }

  return requirements
}

type PasswordInputProps = {
  schema: ZodString
  passwordValue: string
  field: ControllerRenderProps<any, "password">
}

export default function PasswordInput({
  schema,
  field,
  passwordValue,
}: PasswordInputProps) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const requirements = useMemo(() => extractRegexRequirements(schema), [schema])

  const strength = requirements.map((req) => ({
    met: req.regex.test(passwordValue),
    text: req.message,
  }))

  const strengthScore = useMemo(
    () => strength.filter((r) => r.met).length,
    [strength]
  )

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border"
    if (score <= 1) return "bg-red-500"
    if (score <= 2) return "bg-orange-500"
    if (score === 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return "رمز‌ عبور را وارد کنید"
    if (score <= 2) return "رمز عبور ضعیف"
    if (score === 3) return "رمز عبور متوسط"
    return "رمز عبور قوی"
  }

  return (
    <div>
      {/* Password input */}
      <div className="*:not-first:mt-2">
        <div className="relative">
          <Lock className="absolute right-3 top-3 size-4 text-gray-400" />
          <Input
            id={id}
            className="px-10"
            placeholder="Password"
            type={isVisible ? "text" : "password"}
            aria-describedby={`${id}-description`}
            {...field}
          />

          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={requirements.length}
        aria-label="Password strength"
      >
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / requirements.length) * 100}%` }}
        ></div>
      </div>

      {/* Description */}
      <p
        id={`${id}-description`}
        className="mb-2 text-sm font-medium text-foreground"
      >
        {getStrengthText(strengthScore)}.
      </p>

      {/* Requirements list */}
      <ul className="space-y-1.5" aria-label="Password requirements">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-2">
            {req.met ? (
              <CheckIcon
                size={16}
                className="text-emerald-500"
                aria-hidden="true"
              />
            ) : (
              <XIcon
                size={16}
                className="text-muted-foreground/80"
                aria-hidden="true"
              />
            )}
            <span
              className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
            >
              {req.text}
              <span className="sr-only">
                {req.met ? " - Requirement met" : " - Requirement not met"}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
