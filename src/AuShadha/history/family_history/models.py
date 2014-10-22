################################################################################
# PROJECT     : AuShadha
# Description : Models for Family History
# Author      : Dr. Easwar T R
# Date        : 16-09-2013
# Licence     : GNU GPL V3. Please see AuShadha/LICENSE.txt
################################################################################

import importlib

from django.db import models
from django.contrib.auth.models import User

from AuShadha.apps.aushadha_base_models.models import AuShadhaBaseModel,AuShadhaBaseModelForm
from AuShadha.apps.ui.ui import ui as UI

#from patient.models import PatientDetail
PatientDetail  = UI.get_module("PatientRegistration")


from dijit_fields_constants import FAMILY_HISTORY_FORM_CONSTANTS

DEFAULT_FAMILY_HISTORY_FORM_EXCLUDES=('patient_detail',)





class FamilyHistory(AuShadhaBaseModel):

    """
      This defines the Family Medical History that the patient has had.

    """

    def __init__(self, *args, **kwargs):
      super(FamilyHistory,self).__init__(*args, **kwargs)
      self.__model_label__ = "family_history"
      self._parent_model = 'patient_detail'

    family_member = models.CharField(max_length=100,
                                     help_text="mention only relationship.."
                                     )
    deceased = models.BooleanField(default=False)
    age = models.PositiveIntegerField()
    disease = models.CharField(max_length=100,
                               help_text="mention diagnosis as stated by patient / as per reports"
                               )
    age_at_onset = models.PositiveIntegerField()
    patient_detail = models.ForeignKey(PatientDetail,
                                       null=True,
                                       blank=True
                                       )

    def __unicode__(self):
        return "%s" % (self.family_member)



class FamilyHistoryForm(AuShadhaBaseModelForm):
    
    """
      Form class for FamilyHistory form
    
    """

    __form_name__ = "Family History Form"

    dijit_fields = FAMILY_HISTORY_FORM_CONSTANTS

    class Meta:
        model = FamilyHistory
        exclude = DEFAULT_FAMILY_HISTORY_FORM_EXCLUDES