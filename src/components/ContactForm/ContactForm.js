"use client";
import { useState, useEffect, useRef } from "react";
import BackButton from "../BackButton/BackButton";
import { Input, TextArea } from "../ui/input";
import axios from 'axios';
import styles from "./ContactForm.module.scss";
import {
  TextStaggerHover,
  TextStaggerHoverActive,
  TextStaggerHoverHidden,
} from "../TextStaggerHover/TextStaggerHover";
import { useSoundContext } from "@/contexts/SoundContext";
import { useForm } from "react-hook-form";
import Toaster from "@/components/Toaster/Toaster";
import { playMobileClickSound } from "@/utils/playMobileClickSound";

export default function ContactForm({data}) {
  const { playClickSound, isSoundEnabled } = useSoundContext();
  const [applyHovered, setApplyHovered] = useState(false);
  const [industryHovered, setIndustryHovered] = useState(null);
  const [taskHovered, setTaskHovered] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryId, setIndustryId] = useState(null);
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [helpText, setHelpText] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // Phone number state
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [errors, setErrors] = useState({});

  // Toaster state
  const [toaster, setToaster] = useState({ show: false, success: false, message: "" });
  const [showFade, setShowFade] = useState(true);

  // Keyboard sound handler
  const playKeyboardSound = () => {
    if (isSoundEnabled) {
      try {
        const keyboardAudio = new Audio('/sounds/keyboard-2.mp3');
        keyboardAudio.volume = 0.3;
        keyboardAudio.loop = false;
        keyboardAudio.muted = false;
        
        const playPromise = keyboardAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Keyboard sound failed to play:', error);
          });
        }
      } catch (error) {
        console.warn('Failed to create keyboard audio:', error);
      }
    }
  };

  // Refs for input fields
  const projectNameRef = useRef(null);
  const industryRef = useRef(null);
  const taskRef = useRef(null);
  const helpTextRef = useRef(null);
  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const emailRef = useRef(null);

  const { 
    handleSubmit, 
    formState: { errors: formErrors }, 
    watch, 
    reset, 
    setValue, 
    setError, 
    clearErrors,
    trigger 
  } = useForm({
    defaultValues: {
      project_name: "",
      industry: "",
      task: "",
      how_can_we_help: "",
      full_name: "",
      phone: "",
      email: ""
    }
  });

  const termsChecked = watch("terms");

  // Phone number formatting function
  const formatPhoneNumber = (value) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // If it starts with +994, apply Azerbaijani formatting
    if (cleaned.startsWith('+994')) {
      let numbers = cleaned.slice(4);
      numbers = numbers.slice(0, 9);
      
      let formatted = '+994';
      if (numbers.length > 0) {
        formatted += ' ' + numbers.slice(0, 2);
      }
      if (numbers.length > 2) {
        formatted += ' ' + numbers.slice(2, 5);
      }
      if (numbers.length > 5) {
        formatted += ' ' + numbers.slice(5, 7);
      }
      if (numbers.length > 7) {
        formatted += ' ' + numbers.slice(7, 9);
      }
      
      return formatted;
    }
    
    if (cleaned.match(/^(050|051|055|060|070|077)/)) {
      let numbers = cleaned.slice(3);
      numbers = numbers.slice(0, 7);
      
      let formatted = cleaned.slice(0, 3);
      if (numbers.length > 0) {
        formatted += ' ' + numbers.slice(0, 3);
      }
      if (numbers.length > 3) {
        formatted += ' ' + numbers.slice(3, 5);
      }
      if (numbers.length > 5) {
        formatted += ' ' + numbers.slice(5, 7);
      }
      
      return formatted;
    }
    
    return value;
  };

  // Phone number change handler
  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;
    playKeyboardSound();

    inputValue = inputValue.replace(/[^0-9+]/g, "");
    
    if (inputValue === "") {
      setPhoneValue("");
      setMobile("");
      clearError("phone", "");
      setPhoneError("");
      return;
    }
    
    // Only format if it's an Azerbaijani number
    if (inputValue.startsWith('+994') || inputValue.match(/^(050|051|055|060|070|077)/)) {
      const formatted = formatPhoneNumber(inputValue);
      setPhoneValue(formatted);
      setMobile(formatted);
      
      // Validate Azerbaijani numbers
      if (inputValue.startsWith('+994')) {
        const numbers = inputValue.replace(/[^\d]/g, '').slice(3); 
        
        if (numbers.length >= 2) {
          const prefix = numbers.slice(0, 2);
          const validPrefixes = ['10', '50', '51', '55', '60', '70', '77'];
          
          if (!validPrefixes.includes(prefix)) {
            setPhoneError("Invalid operator code");
            return;
          }
        }
        
        if (numbers.length >= 3) {
          const firstDigitAfterPrefix = numbers[2];
          if (firstDigitAfterPrefix === '0') {
            setPhoneError("Phone number cannot start with 0");
            return;
          }
        }
      } else {
        const numbers = inputValue.replace(/[^\d]/g, '').slice(3);
        
        if (numbers.length >= 1 && numbers[0] === '0') {
          setPhoneError("Phone number cannot start with 0");
          return;
        }
      }
    } else {
      // For non-Azerbaijani numbers, just set the value without formatting
      setPhoneValue(inputValue);
      setMobile(inputValue);
    }
    
    setPhoneError("");
    if (errors.mobile) {
      clearError("mobile", inputValue);
    }
  };

  // Phone number key down handler
  const handlePhoneKeyDown = (e) => {
    const cursorPosition = e.target.selectionStart;
    
    if ((e.key === 'Backspace' || e.key === 'Delete') && phoneValue === '+994 ') {
      e.preventDefault();
      setPhoneValue("");
      setMobile("");
      return;
    }
    
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 4 && phoneValue.length > 5) {
      e.preventDefault();
    }
  };

  // Phone number focus handler
  const handlePhoneFocus = () => {
    // No automatic +994 insertion
  };

  // Phone number click handler
  const handlePhoneClick = (e) => {
    const input = e.target;
    const cursorPosition = input.selectionStart;
    
    if (cursorPosition <= 4 && phoneValue.length >= 4) {
      setTimeout(() => {
        input.setSelectionRange(phoneValue.length, phoneValue.length);
      }, 0);
    }
  };

  // Phone number blur handler
  const handlePhoneBlur = () => {
    if (phoneValue === "+994 " || phoneValue === "+994" || phoneValue === "") {
      setPhoneValue("");
      setMobile("");
      setPhoneError("");
      clearError("mobile", "");
    }
  };

  // Scroll to first error only after submit
  const scrollToFirstError = (errorsObj) => {
    if (Object.keys(errorsObj).length > 0) {
      const fieldOrder = [
        "projectName",
        "industry",
        "task",
        "helpText",
        "name",
        "mobile",
        "email",
      ];
      const firstErrorField = fieldOrder.find((field) => errorsObj[field]);

      if (firstErrorField) {
        let targetRef = null;

        switch (firstErrorField) {
          case "projectName":
            targetRef = projectNameRef;
            break;
          case "industry":
            targetRef = industryRef;
            break;
          case "task":
            targetRef = taskRef;
            break;
          case "helpText":
            targetRef = helpTextRef;
            break;
          case "name":
            targetRef = nameRef;
            break;
          case "mobile":
            targetRef = mobileRef;
            break;
          case "email":
            targetRef = emailRef;
            break;
        }

        if (targetRef && targetRef.current) {
          // Add scroll margin so the field is visible below a fixed header (104rem)
          targetRef.current.style.scrollMarginTop = "104rem";
          targetRef.current.focus();
          targetRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    }
  };

  // Use data from props instead of hardcoded arrays
  const industries = data.industries || [];
  const tasks = data.tasks || [];

  const handleApplyClick = () => {
    // Apply button action buraya eklenebilir
  };

  const clearError = (field, value) => {
    if (errors[field] && value.trim() !== "") {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Project name validation
    if (!projectName.trim()) {
      newErrors.projectName = "This field is required";
    } else if (projectName.length > 255) {
      newErrors.projectName = "Project name cannot exceed 255 characters";
    }
    
    // Industry validation
    if (!industry.trim()) {
      newErrors.industry = "This field is required";
    }
    
    // Task validation
    if (!task.trim()) {
      newErrors.task = "This field is required";
    }
    
    // Help text validation
    if (!helpText.trim()) {
      newErrors.helpText = "This field is required";
    }
    
    // Name validation
    if (!name.trim()) {
      newErrors.name = "This field is required";
    } else if (name.length > 255) {
      newErrors.name = "Full name cannot exceed 255 characters";
    }
    
    // Phone validation
    if (!phoneValue.trim()) {
      newErrors.mobile = "Phone number is required";
    } else {
      const cleaned = phoneValue.replace(/\s/g, '');
      // Only validate Azerbaijani numbers if they start with +994
      if (cleaned.startsWith('+994')) {
        if (cleaned.length !== 13) {
          newErrors.mobile = "Phone number must be exactly 9 digits after +994";
        } else {
          const digits = cleaned.slice(4);
          const validPrefixes = ['10', '50', '51', '55', '60', '70', '77'];
          const prefix = digits.slice(0, 2);
          if (!validPrefixes.includes(prefix)) {
            newErrors.mobile = "Invalid operator code";
          } else if (digits.length >= 3 && digits[2] === '0') {
            newErrors.mobile = "Phone number cannot start with 0";
          }
        }
      }
      // Validate operator code format (050, 051, etc.)
      else if (cleaned.match(/^(050|051|055|060|070|077)/)) {
        if (cleaned.length !== 10) {
          newErrors.mobile = "Phone number must be exactly 10 digits";
        } else {
          const digits = cleaned.slice(3);
          if (digits[0] === '0') {
            newErrors.mobile = "Phone number cannot start with 0";
          }
        }
      }
      // For other country codes, just check if it's a valid phone number format
      else if (cleaned.length < 8) {
        newErrors.mobile = "Phone number is too short";
      }
    }
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = "This field is required";
    } else if (!email.includes('@') || email.split('@').length !== 2) {
      newErrors.email = "Email must contain exactly one @ symbol";
    } else if (email.length > 254) {
      newErrors.email = "Email cannot exceed 254 characters";
    }
    
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return;
    }

    const payload = {
      project_name: projectName,
      industry: industryId,
      task: taskId,
      how_can_we_help: helpText,
      full_name: name,
      phone: phoneValue.replace(/\s/g, ''),
      email: email
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_URL}apply-form/`, payload);
      if (response.status === 200 || response.status === 201) {
        setToaster({ show: true, success: true, message: "Thank you! Your application has been sent" });
        setShowFade(true);
        reset();
        setProjectName("");
        setIndustry("");
        setIndustryId(null);
        setTask("");
        setTaskId(null);
        setHelpText("");
        setName("");
        setMobile("");
        setEmail("");
        setPhoneValue("");
        setErrors({});
      } else {
        setToaster({ show: true, success: false, message: "Oops! Something went wrong. Please try again" });
        setShowFade(true);
      }
    } catch (err) {
      console.error(err);
      setToaster({ show: true, success: false, message: "Oops! Something went wrong. Please try again" });
      setShowFade(true);
    }
  };

  return (
    <div className={styles.container}>
      {toaster.show && (
        <Toaster 
          success={toaster.show} 
          setSuccess={(value) => setToaster({ show: false, success: false, message: "" })} 
          showFade={showFade} 
          setShowFade={setShowFade}
          message={toaster.message}
          isError={!toaster.success}
        />
      )}
      <div className={styles.texts}>
        <BackButton />
        <div className={styles.title}>{data.section_label}</div>
        <div className={styles.description}>
          {data.section_title}
        </div>
      </div>

      <form className={styles.formContainer} onSubmit={onSubmit}>
        <div
          className={`${styles.subContainer} ${
            errors.projectName ? styles.subContainerError : ""
          }`}
        >
          <div
            className={`${styles.sectionSubtitle} ${styles.sectionSubtitleInput}`}
          >
            {data.project_label}
          </div>
          <div className={styles.inputBox}>
            <Input
              ref={projectNameRef}
              label="Please write"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                clearError("projectName", e.target.value);
                playKeyboardSound();
              }}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setErrors((prev) => ({
                    ...prev,
                    projectName: "This field is required",
                  }));
                }
              }}
              error={errors.projectName}
            />
          </div>
        </div>

        <div
          className={`${styles.subContainer} ${
            errors.industry ? styles.subContainerError : ""
          }`}
        >
          <div
            className={`${styles.sectionSubtitle} ${styles.sectionSubtitleButton}`}
          >
            {data.industry_label}
          </div>
          <div className={styles.inputBox} ref={industryRef}>
            <div className={styles.industryOptions}>
              {industries.map((ind, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    industry === ind.title
                      ? styles.segmentTabSelected
                      : styles.segmentTab
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    playMobileClickSound(playClickSound);
                    setIndustry(ind.title);
                    setIndustryId(ind.id);
                    clearError("industry", ind.title);
                  }}
                  onMouseEnter={() => {
                    playClickSound();
                    setIndustryHovered(ind.id);
                  }}
                  onMouseLeave={() => setIndustryHovered(null)}
                  onBlur={() => {
                    if (!industry.trim()) {
                      setErrors((prev) => ({
                        ...prev,
                        industry: "This field is required",
                      }));
                    }
                  }}
                >
                  <TextStaggerHover
                    as="span"
                    className={styles.text}
                    isMouseIn={industryHovered === ind.id}
                  >
                    <TextStaggerHoverActive animation="top" text={ind.title} />
                    <TextStaggerHoverHidden animation="bottom" text={ind.title} />
                  </TextStaggerHover>
                </button>
              ))}
            </div>
            {errors.industry && (
              <div className={`${styles.error} ${styles.errorButton}`}>{errors.industry}</div>
            )}
          </div>
        </div>

        <div
          className={`${styles.subContainer} ${
            errors.task ? styles.subContainerError : ""
          }`}
        >
          <div
            className={`${styles.sectionSubtitle} ${styles.sectionSubtitleButton}`}
          >
            {data.task_label}
          </div>
          <div className={styles.inputBox} ref={taskRef}>
            <div className={styles.taskOptions}>
              {tasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={
                    task === t.title ? styles.segmentTabSelected : styles.segmentTab
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    playMobileClickSound(playClickSound);
                    setTask(t.title);
                    setTaskId(t.id);
                    clearError("task", t.title);
                  }}
                  onMouseEnter={() => {
                    playClickSound();
                    setTaskHovered(t.id);
                  }}
                  onMouseLeave={() => setTaskHovered(null)}
                  onBlur={() => {
                    if (!task.trim()) {
                      setErrors((prev) => ({
                        ...prev,
                        task: "This field is required",
                      }));
                    }
                  }}
                >
                  <TextStaggerHover
                    as="span"
                    className={styles.text}
                    isMouseIn={taskHovered === t.id}
                  >
                    <TextStaggerHoverActive animation="top" text={t.title} />
                    <TextStaggerHoverHidden animation="bottom" text={t.title} />
                  </TextStaggerHover>
                </button>
              ))}
            </div>
            {errors.task && <div className={`${styles.error} ${styles.errorButton}`}>{errors.task}</div>}
          </div>
        </div>

        <div
          className={`${styles.subContainer} ${
            errors.helpText ? styles.subContainerError : ""
          }`}
        >
          <div
            className={`${styles.sectionSubtitle} ${styles.sectionSubtitleInput}`}
          >
            {data.how_can_we_help_label}
          </div>
          <div className={styles.inputBox}>
            <TextArea
              ref={helpTextRef}
              label="Please write"
              value={helpText}
              onChange={(e) => {
                setHelpText(e.target.value);
                clearError("helpText", e.target.value);
                playKeyboardSound();
              }}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setErrors((prev) => ({
                    ...prev,
                    helpText: "This field is required",
                  }));
                }
              }}
              error={errors.helpText}
            />
          </div>
        </div>

        <div className={styles.subContainer}>
          <div
            className={`${styles.sectionSubtitle} ${styles.sectionSubtitleInformation}`}
          >
            {data.about_you_label}
          </div>
          <div className={styles.informationInputs}>
            <div className={styles.inputBox}>
              <Input
                ref={nameRef}
                label="Name surname"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name", e.target.value);
                  playKeyboardSound();
                }}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    setErrors((prev) => ({
                      ...prev,
                      name: "This field is required",
                    }));
                  }
                }}
                error={errors.name}
                useErrorBorder={true}
                errorClassName={styles.errorInput}
              />
            </div>
            <div className={styles.contactInputs}>
              <div className={styles.inputBox}>
                <Input
                  ref={mobileRef}
                  label="Mobile number"
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  onFocus={handlePhoneFocus}
                  onClick={handlePhoneClick}
                  onBlur={handlePhoneBlur}
                  error={errors.mobile || phoneError}
                  useErrorBorder={true}
                  errorClassName={styles.errorInput}
                />
              </div>
              <div className={styles.inputBox}>
                <Input
                  ref={emailRef}
                  label="E-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email", e.target.value);
                    playKeyboardSound();
                  }}
                  onBlur={(e) => {
                    const emailValue = e.target.value.trim();
                    if (!emailValue) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "This field is required",
                      }));
                    } else if (!emailValue.includes('@') || emailValue.split('@').length !== 2) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "Email must contain exactly one @ symbol",
                      }));
                    }
                  }}
                  error={errors.email}
                  errorClassName={styles.errorInput}
                  useErrorBorder={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button
            type="submit"
            className={styles.consultingButton}
            onClick={() => {
              playMobileClickSound(playClickSound);
              handleApplyClick();
            }}
            onMouseEnter={() => {
              playClickSound();
              setApplyHovered(true);
            }}
            onMouseLeave={() => setApplyHovered(false)}
          >
            <TextStaggerHover
              as="span"
              className={styles.consultingButtonSpan}
              isMouseIn={applyHovered}
            >
              <TextStaggerHoverActive
                animation="top"
                text={data.request_consulting_button}
              />
              <TextStaggerHoverHidden
                animation="bottom"
                text={data.request_consulting_button}
              />
            </TextStaggerHover>
          </button>
        </div>
      </form>
    </div>
  );
}
