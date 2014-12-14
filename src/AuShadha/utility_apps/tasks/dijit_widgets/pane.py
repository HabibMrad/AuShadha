################################################################################
# Project: AuShadha
# Description: Pane of the UI for tasks
# Author ; Dr.Easwar T.R
# Date: 04-11-2013
# License: GNU-GPL Version3, see LICENSE.txt for details
################################################################################

from cStringIO import StringIO
import yaml

# General Django Imports----------------------------------
from django.http import Http404, HttpResponse
from django.utils import simplejson
from django.core.urlresolvers import reverse
from django.template import Template, Context
from django.contrib.auth.decorators import login_required

from tasks import MODULE_LABEL
from tasks.models import *


@login_required
def render_tasks_pane(request, id = None):
  pass