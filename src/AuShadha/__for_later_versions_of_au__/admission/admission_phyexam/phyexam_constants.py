#
# Physical Examination Constants for AuShadha.
# These Provide Default constants
#
# Author    : Dr.Easwar T.R
# Copyright : 2012
# Date      : 2012-12-31
# Licence   : GNU-GPL Version 3
#

# PHYSICAL EXAMINATION AND INCIDENT CONSTANTS
EXAMINATION_SIDES = (('R', "Right"), ("L", "Left"), ("B/L", "Bilateral"))

INCIDENT_TYPES = (
    ('drug_related', "Drug Related"),
    ("procedure_related",
     "Procedure Related"		),
    ("anaesthesia_related",
     "Anaesthesia Related"	),
    ("others", "Others"),
)

# SYS EXAM NORMALS
HEENT_EX = "No abnormality detected in Head/ Eye/ Ear/ Nose/ Throat and Neck Exam"

CNS_EX         = """
Higher functions normal. GCS 15/ 15.\n
No cranial nerve palsy.\n
No Motor or Sensory Deficit.\n
Deep and Superficial reflexes normal.\n
"""

CVS_EX         = """
Heart sounds normal.\n
Carotid pulsations well felt on both sides.\n
Peripheral pulses well felt on all four limbs.\n
"""

RESP_EX        = """
Air entry equal on both sides.\n
No abnormal breath sounds.\n
Normal Percussion findings. \n
No tenderness in chest wall.\n
"""

GIT_GUT_EX     = """
Abdomen soft and non-tender in all four quadrants.\n
No organomegaly.\n
No abnormal mass palpable.\n
No free fluid or dilated veins.\n
No renal angle tenderness or impulse on cough.\n
No abnormal findings in External genitalia\n
No Inguinal Lymphadenopathy.\n
"""


# REGIONAL EXAM NORMALS
NORM_LIMB_INS  = """
Attitude of limbs normal on both sides.\n
No wasting or apparent Limb length inequality observed.\n
No Apparent deformity, swelling, wounds or discharge noted.\n
"""

NORM_LIMB_PALP = """
No joint line or spinal tenderness, swelling or local warmth noted.\n
No spasm on attempted movements.\n
No abnormal joint laxity or deformity noted.\n
ASIS and shoulders at the same level.\n
Spine profile WNL. No Scoliosis or other deformity noted clinically.\n
No apparent / true limb length inequality.\n
Limb alignment normal.\n
"""

NORM_GAIT      = """
Gait unassisted and stable.\n
No limp / lurch.\n
Trendlenberg test negative.\n
"""

NORM_ROM       = """
Full range of movements of all joints and spine.No fixed deformity.\n
No Pain, spasm / crepitus on movements.\n
No soft tissue contracture.\n
"""

CONSULT_CHOICES = (
    ('initial', 'Initial'		),
    ('fu', 'Follow-Up'),
    ('pre_op', 'Pre-Op'),
    ('post_op', 'Post-OP'),
    ('discharge', 'Discharge')
)
